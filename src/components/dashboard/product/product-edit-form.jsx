'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chip, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { DataTable } from '@/components/core/data-table';
import { FileDropzone } from '@/components/core/file-dropzone';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

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
    fontWeight: ingrediantNames?.includes(ingrediant)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// You could memoize this function to avoid re-creating the columns on every render.
function getImageColumns() {
  return [
    {
      formatter: (row) => {
        return (
          <Box
            sx={{
              backgroundImage: `url(${row.url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              bgcolor: 'var(--mui-palette-background-level2)',
              borderRadius: 1,
              flex: '0 0 auto',
              height: '40px',
              width: '40px',
            }}
          />
        );
      },
      name: 'Image',
      width: '100px',
    },
    { field: 'fileName', name: 'File name', width: '300px' },
  ];
}

const schema = zod.object({
  name: zod.string().min(1, 'Name is required').max(255),
  status: zod.string().max(255).optional(),
  category: zod.string().max(255).optional(),
  type: zod.string().max(255).optional(),
  PreparationTime: zod.number().optional(),
  SpiceLevel: zod.string().max(255).optional(),
  currency: zod.string().min(1, 'Currency is required').max(255),
  price: zod.number().min(0, 'Price must be greater than or equal to 0'),
  images: zod.array(zod.object({ url: zod.string(), fileName: zod.string() })),
  ingredients: zod.array(zod.string()),
});

function getDefaultValues(product) {
  return {
    id: product?.id ?? '',
    name: product?.name ?? '',
    status: product.status ?? '',
    category: product.category ?? '',
    SpiceLevel: product.SpiceLevel ?? '',
    PreparationTime: product.PreparationTime ?? '',
    currency: product.currency ?? 'USD',
    price: product.price ?? 0,
    images: product.images ?? [],
    ingredients: product?.ingredients ? product.ingredients.split(', ') : [],
  };
}

export function ProductEditForm({ product }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [categories, setCategories] = React.useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
    watch,
  } = useForm({ defaultValues: getDefaultValues(product), resolver: zodResolver(schema) });

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
    reset(getDefaultValues(product));
  }, [product, reset]);

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        // Make API request

        const body = _;
        body.image = _.images[0].url;
        body.ingredients = _.ingredients.join(', ');
        body.images = null;
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.patch(
          `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs/${product?.id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        toast.success('Product updated');
        navigate(paths.dashboard.products.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [product, navigate]
  );

  const handleImageDrop = React.useCallback(
    async (files) => {
      // Upload images to the server

      const images = await Promise.all(
        files.map(async (file) => {
          const url = await fileToBase64(file);

          return { url, fileName: file.name };
        })
      );

      setValue('images', [...images]);
    },
    [getValues, setValue]
  );

  const name = watch('name');
  const category = watch('category');
  const tags = watch('tags');
  const images = watch('images');
  const currency = watch('currency');
  const price = watch('price');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid
          size={{
            md: 8,
            xs: 12,
          }}
        >
          <Card>
            <CardContent>
              <Stack divider={<Divider />} spacing={4}>
                <Stack spacing={3}>
                  <Typography variant="h6">Basic information</Typography>
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
                        name="category"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.category)} fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select {...field}>
                              <Option value="">Select a category</Option>
                              {categories.map((cat) => (
                                <Option key={cat._id} value={cat.name}>
                                  {cat.name}
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
                        name="status"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.type)} fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select {...field}>
                              <Option key="published" value="published">
                                Published
                              </Option>
                              <Option key="draft" value="draft">
                                Draft
                              </Option>
                            </Select>
                            {errors.type ? <FormHelperText error>{errors.type.message}</FormHelperText> : null}
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
                              onChange={(event) => {
                                field.onChange(event.target.value);
                              }}
                              input={<OutlinedInput id="select-multiple-chip" label="Ingediants" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected?.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {ingrediants.map((Ingname) => (
                                <MenuItem key={Ingname} value={Ingname} style={getStyles(Ingname, field.value, theme)}>
                                  {Ingname}
                                </MenuItem>
                              ))}
                            </Select>
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
                        name="SpiceLevel"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.type)} fullWidth>
                            <InputLabel>Spice Level</InputLabel>
                            <Select {...field}>
                              <Option value="">Select a level</Option>

                              <Option key="1" value="1">
                                1
                              </Option>
                              <Option key="2" value="2">
                                2
                              </Option>
                              <Option key="3" value="3">
                                3
                              </Option>
                            </Select>
                            {errors.type ? <FormHelperText error>{errors.type.message}</FormHelperText> : null}
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
                        name="PreparationTime"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.PreparationTime)} fullWidth>
                            <InputLabel>Preparation Time</InputLabel>
                            <Select {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
                              <Option value="">Select a time</Option>
                              <Option key="15" value="15">
                                15
                              </Option>
                              <Option key="20" value="20">
                                20
                              </Option>
                              <Option key="25" value="25">
                                25
                              </Option>
                              <Option key="30" value="30">
                                30
                              </Option>
                              <Option key="35" value="35">
                                40
                              </Option>
                              <Option key="40" value="40">
                                45
                              </Option>
                            </Select>

                            {errors.PreparationTime ? (
                              <FormHelperText error>{errors.PreparationTime.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Stack>
                <Stack spacing={3}>
                  <Typography variant="h6">Pricing</Typography>
                  <Stack direction="row" spacing={3}>
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
                            <OutlinedInput {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            {errors.price ? <FormHelperText>{errors.price.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Stack>
                </Stack>
                <Stack spacing={3}>
                  <Typography variant="h6">Images</Typography>
                  <Card sx={{ borderRadius: 1 }} variant="outlined">
                    <DataTable columns={getImageColumns()} rows={images} />
                    {images.length === 0 ? (
                      <Box sx={{ p: 1 }}>
                        <Typography align="center" color="text.secondary" variant="body2">
                          No images
                        </Typography>
                      </Box>
                    ) : null}
                  </Card>
                  <FileDropzone
                    accept={{ 'image/*': [] }}
                    caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                    onDrop={handleImageDrop}
                  />
                </Stack>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button color="secondary" component={RouterLink} href={paths.dashboard.products.list}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save changes
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid
          size={{
            md: 4,
            xs: 12,
          }}
        >
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  {images.length ? (
                    <Box
                      sx={{
                        backgroundImage: `url(${images[0].url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        bgcolor: 'var(--mui-palette-background-level2)',
                        borderRadius: 1,
                        display: 'flex',
                        height: '100px',
                        width: '100px',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: 'var(--mui-palette-background-level2)',
                        borderRadius: 1,
                        display: 'flex',
                        height: '100px',
                        justifyContent: 'center',
                        width: '100px',
                      }}
                    >
                      <ImageIcon fontSize="var(--icon-fontSize-lg)" />
                    </Box>
                  )}
                  <div>
                    <Typography color={name ? 'text.primary' : 'text.disabled'} variant="subtitle1">
                      {name || 'Product name'}
                    </Typography>
                    <Typography color={category ? 'text.secondary' : 'text.disabled'} variant="body2">
                      in {category || 'Category'}
                    </Typography>
                  </div>
                  <Typography color="text.primary" variant="body2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Stack spacing={2}>
              {tags ? (
                <Typography variant="subtitle2">Keywords: {tags.split(',').filter(Boolean).join(', ')}</Typography>
              ) : (
                <Box sx={{ borderRadius: '20px', bgcolor: 'var(--mui-palette-background-level1)', height: '24px' }} />
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
