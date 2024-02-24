import { Link } from "react-router-dom";

const Page404 = () => {
  document.title =
    "404 - Green Haven | Your Source for Seeds, Trees, and Accessories";

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-4">
          It appears the item you were looking for is taking a moment to blossom
          in our vast garden.
          <br />
          Why not explore our diverse collection of seeds, trees, and
          accessories while you wait?
        </p>
        <Link to="/products" className="font-bold hover:underline">
          Return to Green Haven
        </Link>
      </div>
    </div>
  );
};

export default Page404;
