// components/FullScreenPreview.tsx
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchStore } from "@/store/useSearchStore";
import Image from "next/image";

export const FullScreenPreview = () => {
  const { fullScreenPreview, closePreview } = useSearchStore();

  return (
    <Dialog
      open={!!fullScreenPreview}
      onClose={closePreview}
      fullScreen
      PaperProps={{ style: { backgroundColor: "rgba(0,0,0,0.95)" } }}
    >
      <IconButton
        onClick={closePreview}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "#fff",
          zIndex: 10,
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        onClick={closePreview}
      >
       {fullScreenPreview &&  <Image
          src={fullScreenPreview ?? ""}
          alt="Full Screen"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
          fill
          onClick={(e) => e.stopPropagation()}
        />}
      </DialogContent>
    </Dialog>
  );
};