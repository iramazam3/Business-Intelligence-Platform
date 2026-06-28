type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500">{description}</p>
    </div>
  );
}
