import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class GalleryPageDto{
    @HasMimeType(['image/jpeg', 'image/png','image/webp'], { message: 'Invalid type for banner image. Banner image must be a jpeg or png' })
    @IsFile({ message: 'Invalid type for banner image. Banner image must be a file' })
    bannerImage: FileSystemStoredFile | string
}