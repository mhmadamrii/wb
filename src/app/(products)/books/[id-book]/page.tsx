export default async function DetailBook({
  params,
}: {
  params: { 'id-book': string };
}) {
  return (
    <div>
      <span>Detail book</span>
      <h1 className="text-4xl">{params['id-book']}</h1>
    </div>
  );
}
