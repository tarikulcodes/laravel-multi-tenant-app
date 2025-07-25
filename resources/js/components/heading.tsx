export default function Heading({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
    return (
        <div className="mb-8 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
                <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
    );
}
