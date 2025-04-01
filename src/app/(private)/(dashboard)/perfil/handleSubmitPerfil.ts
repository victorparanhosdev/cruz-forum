"use server";

import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { fetchAPI } from '@/lib/fetchAPI';
import { revalidatePath } from 'next/cache';


export async function handleSubmitPerfil(formData: FormData): Promise<void> {
  try {
    const file = formData.get('upload-photo') as File;
    const name = formData.get('name') as string;
    
    let imagePath = null;

    if (file && file.size > 0) {
   
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
    
      const uploadDir = path.join(process.cwd(), 'public', 'perfis');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
     
      const filePath = path.join(uploadDir, fileName);
      
     
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
     
      await writeFile(filePath, buffer);
      

      imagePath = `/perfis/${fileName}`;


   
    await fetchAPI({
            url: `${process.env.NEXTAUTH_URL}/api/perfil`,
            method: 'PUT',
            data: {avatarUrl: imagePath, name}
    })

   
    }
    
    revalidatePath('/perfil')

  } catch (error) {
    console.error("Erro ao processar perfil:", error);
    // Se precisar lidar com erros, faça isso sem retornar um valor
  }
}