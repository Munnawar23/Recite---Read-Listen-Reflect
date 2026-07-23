import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Linking } from "react-native";

export const MECCA_COORDS = { latitude: 21.4225, longitude: 39.8262 };

export interface LocationData {
  coords: { latitude: number; longitude: number };
  permissionStatus: "undetermined" | "granted" | "denied";
}

export function useUserLocation() {
  const queryClient = useQueryClient();

  const locationQuery = useQuery<LocationData>({
    queryKey: ["user-location"],
    queryFn: async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === "granted") {
          const lastLoc = await Location.getLastKnownPositionAsync({});
          if (lastLoc?.coords) {
            return {
              coords: {
                latitude: lastLoc.coords.latitude,
                longitude: lastLoc.coords.longitude,
              },
              permissionStatus: "granted",
            };
          }
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          if (loc?.coords) {
            return {
              coords: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              },
              permissionStatus: "granted",
            };
          }
        }

        return {
          coords: MECCA_COORDS,
          permissionStatus:
            status === "undetermined" ? "undetermined" : "denied",
        };
      } catch (error) {
        console.warn("Could not retrieve user location:", error);
        return {
          coords: MECCA_COORDS,
          permissionStatus: "denied",
        };
      }
    },
    initialData: {
      coords: MECCA_COORDS,
      permissionStatus: "undetermined",
    },
  });

  const requestMutation = useMutation({
    mutationFn: async () => {
      const currentPerm = await Location.getForegroundPermissionsAsync();
      if (currentPerm.canAskAgain) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status;
      }
      if (currentPerm.status === Location.PermissionStatus.DENIED) {
        await Linking.openSettings();
        return "denied";
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-location"] });
      queryClient.invalidateQueries({ queryKey: ["prayer-times"] });
    },
  });

  return {
    coords: locationQuery.data?.coords ?? MECCA_COORDS,
    permissionStatus: locationQuery.data?.permissionStatus ?? "undetermined",
    requestLocation: requestMutation.mutate,
    isLoading: locationQuery.isLoading || requestMutation.isPending,
  };
}
