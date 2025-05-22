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
import { KeyboardArrowRight, SearchRounded } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import {
  Card,
  CardMedia,
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchStore } from "@/store/useSearchStore";

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

export default function Search() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const {
  prompt,
  files,
  handleFileChange,
  handleRemove,
  handleSearch,
  setPrompt,
  openPreview
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
        }}
        style={{
          top: "auto",
          bottom: 0,
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
                <Card sx={{ width: "100%", height: "100%", p: 1 }} onClick={()=>openPreview(fileObj.previewUrl)}>
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
                  onKeyDown={(event)=>{
                    if (event.key === 'Enter' || event.keyCode === 13) {
                      handleSearch()
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
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
              <ColorModeIconDropdown size="medium" />
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    top: "var(--template-frame-height, 0px)",
                  },
                }}
              >
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>

                  <MenuItem>Features</MenuItem>
                  <MenuItem>Highlights</MenuItem>
                  <MenuItem>
                    <Button color="primary" variant="text" size="small">
                      Try Model <KeyboardArrowRight />
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}
