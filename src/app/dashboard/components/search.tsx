import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../../shared-theme/ColorModeIconDropdown";
import Image from "next/image";
import {
  KeyboardArrowRight,
  KeyboardDoubleArrowUp,
  SearchRounded,
} from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import {
  Autocomplete,
  Card,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Skeleton,
  Slider,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchStore } from "@/store/useSearchStore";
import { grey } from "@mui/material/colors";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
type FileWithPreview = {
  file: File;
  previewUrl: string;
};
type SearchEntry = {
  prompt: string;
  files: FileWithPreview[];
};

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

export default function Search() {
  const [open, setOpen] = useState(false);
  const [Task, setTask] = useState("");
  const [Size, setSize] = useState("");
  const [negativePrompt, setNegativePrompt] = useState('')
  const [temp, setTemp] = useState(0.5)

  const handleTemp = (event: Event, value: number | number[], activeThumb: number) => {
    if (typeof value === "number") {
      setTemp(value);
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  

  const handleTaskChange = (event: SelectChangeEvent) => {
    setTask(event.target.value);
  };
  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

  const {
    prompt,
    files,
    handleFileChange,
    handleRemove,
    handleSearch,
    setPrompt,
    openPreview,
  } = useSearchStore();

  return (
    <>
      <AppBar
        position="fixed"
        id="searchbar"
        key={"searchbar"}
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mb: "calc(var(--template-frame-height, 0px) + 28px)",
          transition:'bottom 1s ease'
        }}
        style={{
          top: "auto",
          bottom: open ? 400 : -20
          ,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={"row"} sx={{ gap: 1, mb: 1 }}>
            {files.map((fileObj, index) => (
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  "&:hover .remove-btn": { opacity: 1 },
                }}
              >
                <Card
                  sx={{ width: "100%", height: "100%", p: 1 }}
                  onClick={() => openPreview(fileObj.previewUrl)}
                >
                  <CardMedia
                    component="img"
                    image={fileObj.previewUrl}
                    alt={`Preview ${index}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
                <IconButton
                  size="small"
                  onClick={() => handleRemove(index)}
                  className="remove-btn"
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "white",
                    boxShadow: 1,
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    "&:hover": { backgroundColor: "#eee" },
                  }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <FormControl sx={{ width: { xs: "100%" } }} variant="outlined">
                <OutlinedInput
                  size="small"
                  id="search"
                  placeholder="Search…"
                  sx={{ flexGrow: 1 }}
                  inputProps={{
                    "aria-label": "search",
                  }}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.keyCode === 13) {
                      handleSearch();
                    }
                  }}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<SearchRounded />}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={toggleDrawer(!open)}
              >
                <KeyboardDoubleArrowUp />
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
              >
                <CloudUploadIcon />
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={handleSearch}
              >
                <SearchRounded />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={toggleDrawer(!open)}
              >
                <KeyboardDoubleArrowUp />
              </Button>
            </Box>
          </StyledToolbar>
        </Container>
        <Stack spacing={1} sx={{ width: "100%", position: "relative" }}>
          <Stack sx={{p:2,position: "absolute",width: "100%"}}>
            <Stack
              sx={(theme) => ({
                
                background: "white",
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gridTemplateRows: {
                  xs: "1fr 1fr 3fr 1fr",
                  sm: "1fr 2fr 1fr",
                },
                gap: 2,
                p: 2,
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(17, 25, 40, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                ...theme.applyStyles("light", {
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  backgroundColor: "rgba(255, 255, 255, 0.65)",
                  borderRadius: "12px",
                  border: "1px solid rgba(209, 213, 219, 0.7)",
                }),
              })}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Task">Task</InputLabel>
                <Select
                  labelId="Task"
                  id="Task1"
                  value={Task}
                  label="Task"
                  onChange={handleTaskChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>With label + helper text</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Size">Size</InputLabel>
                <Select
                  labelId="Size"
                  id="Size1"
                  value={Size}
                  label="Size"
                  onChange={handleSizeChange}
                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>With label + helper text</FormHelperText>
              </FormControl>
          <TextField
          id="outlined-negative-prompt-static"
          label="Negative Prompt"
          multiline
          rows={6}
          value={negativePrompt}
          onChange={(e)=>setNegativePrompt(e.target.value)}
          sx={{flexGrow:1,height:'100%',m:1,gridColumn:'span 2'}}
          variant="outlined"
        />
        <Stack sx={{m:1,gridColumn:'span 2'}}>
                <InputLabel id="Temp">Temp</InputLabel>
          <FormControl>

  <Slider
    value={temp}
    onChange={handleTemp}
    defaultValue={0.00000005}
    step={0.05}
    marks
    min={0.0}
    max={1.0}
    getAriaValueText={(value)=>value.toString()}
    valueLabelDisplay="auto"
  />
        </FormControl>
        </Stack>
              
            </Stack>
          </Stack>
        </Stack>
      </AppBar>
    </>
  );
}
