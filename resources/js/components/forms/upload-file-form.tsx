import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import React from 'react';

const UploadFileForm = () => {
    const { setData, post, processing, errors, reset, progress } = useForm({
        box_id: '9d1c5770-30fc-4898-a603-65f74e745329',
        file: null as File | null,
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        post(route('files.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="m-4 max-w-xl p-2">
            <div className="space-y-2">
                <Input
                    name="file"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setData('file', e.target.files[0]);
                        }
                    }}
                />
                {progress && (
                    <progress
                        value={progress.percentage}
                        max="100"
                        className="h-4 w-full border bg-blue-500 text-white"
                    >
                        {progress.percentage}%
                    </progress>
                )}
                {errors && (
                    <div className="mt-2 text-sm text-destructive">
                        {errors.file}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <Button type="submit" loading={processing || loading}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default UploadFileForm;
