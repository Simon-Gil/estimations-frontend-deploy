import { useSelector } from "react-redux";
import { AppStore } from "@/Redux/store";

export const useHasAccess = (
  subject: string,
  requiredActions?: string[]
): boolean => {
  const userPermissions = useSelector(
    (store: AppStore) => store.user.permissions
  );

  if (!userPermissions || !Array.isArray(userPermissions)) {
    return false;
  }

  return userPermissions.some((permission) => {
    if (permission.subject !== subject) return false;

    if (!requiredActions || requiredActions.length === 0) {
      return true;
    }

    if (requiredActions.includes(permission.action)) return true;

    if (!Array.isArray(permission.action)) return false;

    if (Array.isArray(permission.action)) {
      return permission.action.some(
        (action: { action: string; childActions?: { action: string }[] }) => {
          if (requiredActions.includes(action.action)) return true;
          if (!Array.isArray(action.childActions)) return false;
          return action.childActions.some((childAction) =>
            requiredActions.includes(childAction.action)
          );
        }
      );
    }
    return false;
  });
};
