import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Synthesize Prompts',
    description:
      'Synthesize Prompts to Give LLMs more info to work on.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Models',
    description:
      'We use best of the models there is to offer like Lamma, GPT, Mistral, etc.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Precision in every detail',
    description:
      'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlight"
      sx={(theme)=>({
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.100',
        ...theme.applyStyles('dark', {
              bgcolor: 'grey.900',
            })
      })}
      
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" sx={(theme)=>({ color: 'grey.900' ,...theme.applyStyles('dark', {
             color: 'white',
            })})} gutterBottom >
            Highlights
          </Typography>
          <Typography variant="body1" sx={(theme)=>({ color: 'grey.700' ,...theme.applyStyles('dark', {
             color: 'grey.400',
            })})}>
            Explore why our product stands out: adaptability, prompts synthesization,
            user-friendly design, and innovation. Enjoy best models and
            precision in every detail.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={(theme)=>({
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.300',
                  ...theme.applyStyles('dark', {
                  backgroundColor: 'grey.800',
            })
                })}
              >
                <Box sx={(theme)=>({ opacity: '50%' ,...theme.applyStyles('light', {
             color: 'black',
            })})}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={(theme)=>({ fontWeight: 'medium',color:'black' ,...theme.applyStyles('dark', {
             color: 'white',
            })})}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={(theme)=>({ color: 'grey.700' ,...theme.applyStyles('dark', {
             color: 'grey.400',
            })})}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
