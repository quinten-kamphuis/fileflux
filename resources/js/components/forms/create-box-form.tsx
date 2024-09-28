import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import React from 'react';

export const CreateBoxForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post(route('boxes.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Input
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors && (
                    <div className="mt-2 text-sm text-destructive">
                        {errors.name}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <Button type="submit" loading={processing}>
                    Create
                </Button>
            </div>
        </form>
    );
};
