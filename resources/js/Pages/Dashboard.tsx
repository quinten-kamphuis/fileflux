import { CardWrapper } from '@/components/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <section>
                <div className="container">
                    <div className="grid grid-cols-2 gap-6">
                        <CardWrapper
                            title="Dashboard"
                            description="Welcome to the dashboard."
                        >
                            <div>
                                <p>You're logged in!</p>
                            </div>
                        </CardWrapper>
                        <CardWrapper title="Boxes" description="Boxes content">
                            <div>
                                <p>You currently have no boxes.</p>
                            </div>
                        </CardWrapper>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
