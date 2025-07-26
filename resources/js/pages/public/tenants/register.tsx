import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    centralDomain: string;
}

const TenantsRegister = ({ centralDomain }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        subdomain: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('register-tenant.store'));
    };

    return (
        <PublicLayout>
            <Head title="Register Tenant" />

            <div className="mt-10">
                <Card className="mx-auto w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle>Register Tenant</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="The name of your tenant"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subdomain">Subdomain</Label>
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        id="subdomain"
                                        value={data.subdomain}
                                        onChange={(e) => setData('subdomain', e.target.value)}
                                        placeholder="your-tenant"
                                        className="rounded-r-none"
                                    />
                                    <div className="flex items-center rounded-r-md border border-l-0 bg-muted px-3 py-2 text-sm text-muted-foreground">
                                        .{centralDomain}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Your tenant will be available at:{' '}
                                    <span className="font-medium">
                                        {data.subdomain || 'your-tenant'}.{centralDomain}
                                    </span>
                                </p>
                                <InputError message={errors.subdomain} />
                            </div>
                            <Button type="submit" disabled={processing}>
                                Register
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PublicLayout>
    );
};

export default TenantsRegister;
