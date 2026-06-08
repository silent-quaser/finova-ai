export default function PageHeader({
  title,
  description,
}) {
  return (
    <div className="mb-8">
      
      <h1 className="text-4xl font-bold mb-3">
        {title}
      </h1>

      <p className="text-zinc-400 text-lg">
        {description}
      </p>

    </div>
  );
}