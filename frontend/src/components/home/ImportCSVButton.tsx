import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as Components from "@/components";
import { useState } from "react";

const ImportCSVButton = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-32 px-4 py-2 font-semibold transition-all ease-in-out rounded-lg bg-primary text-slate-50 hover:bg-primary/90">
          Import CSV
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
          <DialogDescription>
            Choose the CSV file you want to import.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Components.FileUploader
            file={file}
            onFileChange={handleFileChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCSVButton;
