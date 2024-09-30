import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileSystemStore } from '@/lib/store/file-system-store';
import { useForm } from '@inertiajs/react';
import React from 'react';

const CreateFolderForm = () => {
    const { boxId, folderId } = useFileSystemStore((state) => state);

    const { data, setData, post, processing, errors, reset } = useForm({
        box_id: boxId,
        parent_folder_id: folderId,
        name: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('folders.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="m-4 max-w-xl p-2">
            <div className="space-y-2">
                <Label htmlFor="name">Folder Name</Label>
                <Input
                    name="name"
                    type="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors && (
                    <div className="mt-2 text-sm text-destructive">
                        {errors.name}
                    </div>
                )}
                <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <Button type="submit" loading={processing}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default CreateFolderForm;
