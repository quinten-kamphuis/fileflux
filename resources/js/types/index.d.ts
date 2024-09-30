import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Box {
    id: string;
    name: string;
    owner: {
        id: number;
        name: string;
    };
    breadcrumbs: Breadcrumb[];
    links: {
        self: string;
    };
    folderCount: number;
    fileCount: number;
    folders: Folder[];
    files: File[];
}
[];

export interface Folder {
    id: string;
    name: string;
    owner: {
        id: number;
        name: string;
    };
    boxId: string;
    links: {
        self: string;
        parent: string;
    };
    breadcrumbs: Breadcrumb[];
    folderCount: number;
    fileCount: number;
    folders: Folder[];
    files: File[];
}

export interface File {
    id: string;
    name: string;
    path: string;
    owner: {
        id: number;
        name: string;
        email: string;
    };
    boxId: string;
    folderId: string | null;
    size: number | null;
    extension: string | null;
    mimeType: string | null;
    createdAt: string;
    links: {
        self: string;
        parent: string;
        download: string;
        delete: string;
    };
    breadcrumbs: Breadcrumb[];
}

export interface FileSystemItem {
    id: string;
    name: string;
    type: NavigationVariant;
    owner: {
        id: number;
        name: string;
    };
    boxId: string;
    parentFolderId: string | null;
    size: number;
    mimeType: string;
    links: {
        self: string;
        parent: string;
        download: string | null;
        delete: string | null;
    };
    folderCount: number | null;
    fileCount: number | null;
    createdAt: string;
}

export interface Breadcrumb {
    id: string;
    name: string;
    link?: string;
}

export type NavigationVariant = 'box' | 'folder' | 'file';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
