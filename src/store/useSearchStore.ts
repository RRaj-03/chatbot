import { create } from 'zustand';

type FileWithPreview = {
  file: File;
  previewUrl: string;
};

export enum Type {
    ADMIN = "admin",
    USER = 'user'
}
type SearchEntry = {
  prompt: string;
  files: FileWithPreview[];
  user: Type
};

type SearchStore = {
  prompt: string;
  files: FileWithPreview[];
  searchHistory: SearchEntry[];
  fullScreenPreview: string | null;
  setPrompt: (text: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (index: number) => void;
  handleSearch: () => void;
  reset: () => void;
  openPreview: (url: string) => void;
  closePreview: () => void;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  prompt: '',
  files: [],
  searchHistory: [],
  fullScreenPreview: null,

  setPrompt: (text) => set({ prompt: text }),

  handleFileChange:  (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);
  const newFiles: FileWithPreview[] = selectedFiles.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
  }));

  set((state) => ({
      files: [...state.files, ...newFiles],
    }));

  // ✅ Reset input value to allow same file selection again
  e.target.value = "";
},

  handleRemove: (index) => {
    const { files } = get();
    URL.revokeObjectURL(files[index].previewUrl);
    set({
      files: files.filter((_, i) => i !== index),
    });
  },

  handleSearch: () => {
    const { prompt, files } = get();
    if (prompt.trim() === '') return;

    const newEntry: SearchEntry = {
      prompt,
      files: [...files],
      user:Type.USER
    };

    set((state) => ({
      searchHistory: [...state.searchHistory, newEntry],
      prompt: '',
      files: [],
    }));
  },

  reset: () => {
    const { files } = get();
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    set({ prompt: '', files: [] });
  },
  openPreview: (url) => set({ fullScreenPreview: url }),
  closePreview: () => set({ fullScreenPreview: null }),
}));