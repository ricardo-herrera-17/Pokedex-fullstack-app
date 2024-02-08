import { useAuth } from "../provider/authProvider";

import { ProtectedRoutes } from "./ProtectedRoutes";
import { UnProtectedRoutes } from "./UnProtectedRoutes";

export const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return signed ? <ProtectedRoutes /> : <UnProtectedRoutes />;
};
