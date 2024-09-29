import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFoldersAndFilesCountString = (
    folderCount: number,
    fileCount: number,
) => {
    const foldersString =
        folderCount === 1 ? '1 Folder' : `${folderCount} Folders`;
    const filesString = fileCount === 1 ? '1 File' : `${fileCount} Files`;
    return `${foldersString}, ${filesString}`;
};
