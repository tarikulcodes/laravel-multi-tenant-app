import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { type Tenant } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface Props {
    tenants: Tenant[];
}

const TenantsIndex = ({ tenants }: Props) => {
    return (
        <PublicLayout>
            <Head title="Tenants" />

            <div className="app-container mt-10">
                <div className="mx-auto max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tenants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4">
                                {tenants.map((tenant) => (
                                    <div key={tenant.id} className="flex justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="grid grid-cols-1">
                                                {tenant.name} <small>{tenant.id}</small>
                                            </div>
                                            <div className="grid grid-cols-1">
                                                {tenant.domains.map((domain) => (
                                                    <div key={domain}>{domain}</div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="outline" asChild>
                                                <a href={`http://${tenant.domains[0]}`} target="_blank">
                                                    View <ArrowRight />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
};

export default TenantsIndex;
