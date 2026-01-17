const DynamicRoutePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-2xl font-medium">This is dynamic route for page {id}</h1>
    </div>
  );
};

export default DynamicRoutePage;
