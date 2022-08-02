import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// __dirname

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Uploader

const storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,__dirname+'/public/images')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Funcion que graba el chat en un archivo de txt.
let path = __dirname+'/files/chat.txt';
export const saveChat = async (chatText) =>{
  try {
    await fs.promises.writeFile(path,chatText);
    console.log('guardado chat');
  } catch (error) {
    console.log('error al grabar archivo',error);
  }
} 

export const uploader = multer({ storage: storage });
export default __dirname;
