'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  image: zod.string().optional(),
  name: zod.string().min(1, 'Name is required').max(255),
  price: zod.preprocess(
    (val) => Number(val), // Convert input string to number
    zod.number().min(0.01, 'Price must be greater than 0')
  ),
  category: zod.string().max(255).optional(),
  ingredients: zod.string().max(255).optional(),
  description: zod.string().max(5000).optional(),
  tags: zod.string().max(255).optional(),
});

const defaultValues = {
  image: '',
  name: '',
  price: '',
  category: '',
  ingredients: '',
  description: '',
  tags: '',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ingrediants = [
  'Tomato',
  'tuna',
  'onions',
  'olives',
  'cheese',
  'chicken',
  'mozzarella',
  'BBQ sauce',
  'cilantro',
  'ham',
  'pineapple',
];

function getStyles(ingrediant, ingrediantNames, theme) {
  return {
    fontWeight: ingrediantNames.includes(ingrediant)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error('Error converting file to base64'));
    };
  });
}

export function ProductCreateForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [ingrediant, setIngrediant] = React.useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        // Make API request
        _.ingredients = ingrediant.join(', ');
        toast.success('Product created');
        navigate(paths.dashboard.products.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate, ingrediant]
  );

  const handleAvatarChange = React.useCallback(
    async (event) => {
      const file = event.target.files?.[0];

      if (file) {
        const url = await fileToBase64(file);
        setValue('image', url);
      }
    },
    [setValue]
  );

  const avatarInputRef = React.useRef(null);
  const avatar = watch('image');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setIngrediant(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.data.categories); // Assuming the API returns a `categories` array
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Basic information</Typography>
              <Grid size={12}>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{
                      border: '1px dashed var(--mui-palette-divider)',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      p: '4px',
                    }}
                  >
                    <Avatar
                      src={avatar}
                      sx={{
                        '--Avatar-size': '100px',
                        '--Icon-fontSize': 'var(--icon-fontSize-lg)',
                        alignItems: 'center',
                        bgcolor: 'var(--mui-palette-background-level1)',
                        color: 'var(--mui-palette-text-primary)',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <CameraIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  </Box>
                  <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                    <Typography variant="subtitle1">Image</Typography>
                    <Typography variant="caption">Min 400x400px, PNG or JPEG</Typography>
                    <Button
                      color="secondary"
                      onClick={() => {
                        avatarInputRef.current?.click();
                      }}
                      variant="outlined"
                    >
                      Select
                    </Button>
                    <input hidden onChange={handleAvatarChange} ref={avatarInputRef} type="file" />
                  </Stack>
                </Stack>
              </Grid>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.name)} fullWidth>
                        <InputLabel required>Product name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.price)} fullWidth>
                        <InputLabel>Price</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.price ? <FormHelperText>{errors.price.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.category)} fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select {...field}>
                          <Option value="">Select a category</Option>
                          {categories.map((category) => (
                            <Option key={category._id} value={category._id}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                        {errors.category ? <FormHelperText error>{errors.category.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.ingredients)} fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Ingrediants</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          {...field}
                          value={ingrediant}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Ingediants" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {ingrediants.map((name) => (
                            <MenuItem key={name} value={name} style={getStyles(name, ingrediant, theme)}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.description)} fullWidth>
                        <InputLabel>Description</InputLabel>
                        <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
                          <TextEditor
                            content={field.value ?? ''}
                            onUpdate={({ editor }) => {
                              field.onChange(editor.getText());
                            }}
                            placeholder="Write something"
                          />
                        </Box>
                        {errors.description ? (
                          <FormHelperText error>{errors.description.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.name)} fullWidth>
                        <InputLabel>Tags</InputLabel>
                        <OutlinedInput {...field} placeholder="e.g Modern, Clean, etc" />
                        {errors.name ? (
                          <FormHelperText>{errors.name.message}</FormHelperText>
                        ) : (
                          <FormHelperText>Tags must be separated by comma</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.products.list}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
