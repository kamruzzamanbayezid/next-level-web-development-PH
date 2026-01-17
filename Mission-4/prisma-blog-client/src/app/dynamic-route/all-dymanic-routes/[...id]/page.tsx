const AllDynamicRoutePage = async ({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) => {
  const { id } = await params;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium">
        This is all dynamic route for page
      </h1>
      <p className="mt-4">Current path segment: {id.join(" / ")}</p>
    </div>
  );
};

export default AllDynamicRoutePage;
