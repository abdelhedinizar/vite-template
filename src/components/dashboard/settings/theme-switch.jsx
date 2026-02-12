import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import { Gear as GearIcon } from '@phosphor-icons/react/dist/ssr/Gear';
import { Moon as MoonIcon } from '@phosphor-icons/react/dist/ssr/Moon';
import { Sun as SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';

import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { useSettings } from '@/hooks/use-settings';
import { SettingsDrawer } from '@/components/core/settings/settings-drawer';

export function ThemeSwitch() {
  const { settings, setSettings } = useSettings();
  const { mode, setMode } = useColorScheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleUpdate = async (values) => {
    const { mode: newMode, ...other } = values;

    if (newMode) {
      setMode(newMode);
    }

    const updatedSettings = { ...settings, ...other };

    setPersistedSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const handleReset = async () => {
    setMode(null);
    setPersistedSettings({});
    setSettings(applyDefaultSettings({}));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <GearIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Theme options"
      />
      <CardContent>
        <Card variant="outlined">
          <RadioGroup
            value={mode ?? 'system'}
            onChange={(event) => {
              setMode(event.target.value);
            }}
            sx={{
              gap: 0,
              '& .MuiFormControlLabel-root': {
                justifyContent: 'space-between',
                p: '8px 12px',
                '&:not(:last-of-type)': { borderBottom: '1px solid var(--mui-palette-divider)' },
              },
            }}
          >
            {[
              { title: 'Light mode', description: 'Best for bright environments', value: 'light', icon: SunIcon },
              { title: 'Dark mode', description: 'Recommended for dark rooms', value: 'dark', icon: MoonIcon },
              { title: 'System', description: "Adapts to your device's theme", value: 'system', icon: SunIcon },
            ].map((option) => (
              <FormControlLabel
                control={<Radio />}
                key={option.value}
                label={
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Avatar>
                      <option.icon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                    <div>
                      <Typography variant="inherit">{option.title}</Typography>
                      <Typography color="text.secondary" variant="caption">
                        {option.description}
                      </Typography>
                    </div>
                  </Stack>
                }
                labelPlacement="start"
                value={option.value}
              />
            ))}
          </RadioGroup>
        </Card>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          onClick={() => {
            setOpenDrawer(true);
          }}
          variant="outlined"
        >
          Plus d&apos;options
        </Button>
      </CardActions>
      <SettingsDrawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        onReset={handleReset}
        onUpdate={handleUpdate}
        open={openDrawer}
        values={{ ...settings, mode }}
      />
    </Card>
  );
}
