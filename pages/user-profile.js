export default function UserProfilePage({ userName }) {
  return <h1>{userName}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log("Server side code");

  return {
    props: {
      userName: "Ruslan",
    },
  };
}
