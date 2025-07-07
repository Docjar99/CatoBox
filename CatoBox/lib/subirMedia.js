// subirMedia.js
import * as ImagePicker from "expo-image-picker";
import { supabase } from "./supabase";

export async function seleccionarYSubirMedia() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const file = result.assets[0];
    const ext = file.uri.split(".").pop();
    const isImage = file.type === "image";
    const path = `publicaciones/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("publicaciones")
      .upload(path, {
        uri: file.uri,
        name: file.fileName || `archivo.${ext}`,
        type: file.type,
      });

    if (error) {
      console.error("Error al subir media:", error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("publicaciones")
      .getPublicUrl(path);

    return {
      media_url: data.publicUrl,
      media_type: isImage ? "image" : "video",
    };
  }

  return null;
}
