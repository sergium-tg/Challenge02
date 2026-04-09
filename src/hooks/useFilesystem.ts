import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [fileContent, setFileContent] = useState<string>("");
  const fileName = "reto07_test.txt";

  const writeFile = async (text: string) => {
    await Filesystem.writeFile({
      path: fileName,
      data: text,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    alert("Archivo guardado!");
  };

  const readFile = async () => {
    try {
      const contents = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      setFileContent(contents.data as string);
    } catch (e) {
      alert("No se encontró el archivo. Guárdalo primero.");
    }
  };

  return { fileContent, writeFile, readFile };
};