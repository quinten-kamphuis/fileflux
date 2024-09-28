import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React from 'react';

const CreateFolderForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        box_id: '9d1e6a93-7bd0-4a1f-bc51-5abbeeceb6e2',
        owner_id: 1,
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
