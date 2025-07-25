import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import AdminLayout from '@/layouts/admin-layout';
import { ROLE_OUTLINE_COLORS } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { Role, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEventHandler } from 'react';

const UserEdit = ({ user, roles }: { user: User; roles: Role[] }) => {
    const initials = useInitials();

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles?.map((role) => role.id) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.users.update', user.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleRoleChange = (roleId: number, checked: boolean) => {
        if (checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData(
                'roles',
                data.roles.filter((id) => id !== roleId),
            );
        }
    };

    return (
        <AdminLayout
            breadcrumbs={[
                { title: 'Users', href: '/admin/users' },
                { title: 'Edit User', href: `/admin/users/${user.id}/edit` },
            ]}
        >
            <Head title={`Edit User - ${user.name}`} />

            <div className="mx-auto max-w-4xl p-4">
                <Heading
                    title="Edit User"
                    description="Update the user's information and roles below. Make sure to save your changes when finished."
                    actions={
                        <Button variant="outline" onClick={() => window.history.back()}>
                            <X className="mr-2 size-4" />
                            Cancel
                        </Button>
                    }
                />

                <form onSubmit={submit} className="space-y-6">
                    {/* User Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Avatar className="size-12">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-lg">{initials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-xl font-semibold">User Information</div>
                                    <div className="text-sm text-muted-foreground">User ID: #{user.id}</div>
                                </div>
                            </CardTitle>
                            <CardDescription>Update the basic information for this user account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter full name"
                                        disabled={processing}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter email address"
                                        disabled={processing}
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Account Status</Label>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={user.email_verified_at ? 'default' : 'destructive'}>
                                            {user.email_verified_at ? 'Verified' : 'Unverified'}
                                        </Badge>
                                        {user.email_verified_at && (
                                            <span className="text-sm text-muted-foreground">
                                                Verified {new Date(user.email_verified_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Member Since</Label>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Roles Management Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Assignment</CardTitle>
                            <CardDescription>
                                Select the roles that should be assigned to this user. Roles determine what actions the user can perform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Current Roles</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles?.length ? (
                                            user.roles.map((role) => (
                                                <Badge
                                                    key={role.id}
                                                    variant="outline"
                                                    className={cn('capitalize', ROLE_OUTLINE_COLORS[role.name as keyof typeof ROLE_OUTLINE_COLORS])}
                                                >
                                                    {role.text}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-sm text-muted-foreground">No roles assigned</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Available Roles</Label>
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {roles.map((role) => {
                                            const isChecked = data.roles.includes(role.id);
                                            return (
                                                <div
                                                    key={role.id}
                                                    className="flex items-start space-x-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                                >
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        checked={isChecked}
                                                        onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                                                        disabled={processing}
                                                    />
                                                    <div className="flex-1 space-y-1">
                                                        <Label htmlFor={`role-${role.id}`} className="cursor-pointer text-sm font-medium capitalize">
                                                            {role.text}
                                                        </Label>
                                                        {role.description && <p className="text-xs text-muted-foreground">{role.description}</p>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <InputError message={errors.roles} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4">
                        <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>
                            <X className="mr-2 size-4" />
                            Cancel
                        </Button>

                        <div className="flex items-center gap-3">
                            <Button type="submit" disabled={processing} className="min-w-[120px]">
                                <Save className="mr-2 size-4" />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default UserEdit;
