import path from "node:path";
import fs from "node:fs/promises";

export default function ProductDetailPage({ product }) {
  if (product === undefined) {
    return <p>Something is broken...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await getData();
  const product = data.products.find(
    (product) => product.id === context.params.pid
  );

  return {
    props: {
      product,
    },
  };
}
