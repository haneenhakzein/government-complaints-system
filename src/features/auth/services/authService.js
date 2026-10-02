import apiClient from "@/common/services/apiClient";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { mapLoginResponse } from "../mappers/authMapper";

export async function loginRequest({ identifier, password, clientFingerprint = "web-client" }) {
  const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
    identifier,
    password,
    client_fingerprint: clientFingerprint,
  });

  return mapLoginResponse(response);
}
