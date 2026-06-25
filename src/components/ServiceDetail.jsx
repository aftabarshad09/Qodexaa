import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSetStatus } from "../context/StatusContext";

// /services/:slug only ever reaches this component for slugs that aren't
// one of the 7 real service pages — those are matched by their own static
// routes first (React Router ranks static segments above dynamic ones).
// So every render here is, by definition, an invalid slug.
export default function ServiceDetail() {
  const { slug } = useParams();
  useSetStatus(404);

  return (
    <div className="sd__not-found" style={{ padding: "120px 24px", textAlign: "center" }}>
      <Helmet>
        <title>Service Not Found — Qodexaa</title>
        <meta name="description" content="The service you're looking for doesn't exist. Browse Qodexaa's full list of services." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1>Service Not Found</h1>
      <p>"{slug}" isn't a service we offer. Browse our full list of services below.</p>
      <Link to="/services">Browse Our Services</Link>
    </div>
  );
}
