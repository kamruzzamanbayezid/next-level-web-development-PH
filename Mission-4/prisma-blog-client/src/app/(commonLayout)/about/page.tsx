export const dynamic = "force-dynamic";

const aboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // throw new Error("Something is wrong! Please try again later");

  return <div>This us about page content!!</div>;
};

export default aboutPage;
