import useSWR from "swr";

export default function LastSalesPage({ sales }) {
  const { data, error } = useSWR(
    "https://nextjs-course-f0bb2-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const transformedSales = [];

          for (const key in data) {
            transformedSales.push({
              id: key,
              username: data[key].username,
              volume: data[key].volume,
            });
          }

          return transformedSales;
        })
  );

  if (error) {
    return <p>Error</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {(data ? data : sales).map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-f0bb2-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  );

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
  };
}
