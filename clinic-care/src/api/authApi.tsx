
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

// this is for authentication
export function useAuthStatusDoctor() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      let token = localStorage.getItem("clinicToken");
      console.log("querying local storage token", token);
      if (!token) {
        throw Error("token required");
      }

      let decoded = jwtDecode(token);
      console.log("check decoded...", decoded);
      return decoded;
    },
    retry: false,
  });

  if (isLoading || isFetching) {
    return { status: "loading" };
  } else if (error) {
    const error: { message: string } = { message: "Something went wrong" };
    return { status: "error", message: error.message };
  } else if (!data) {
    return { status: "no data" };
  }

  return { status: "success", data: data };
}

//from the onLogin use mutation get the username and pw input then fetch the backend database
export async function login(usernameInput: string, passwordInput: string) {
  console.log("authAPI try to log in");

  try {
    let res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/drAuth/drLogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameInput, passwordInput }),
        
      }
    );
    console.log("login done")
    
    let result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Login failed');
    }

    return result.token as string;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

//simply remove token from local storage, and redirect page
export function logout(token: any) {
  console.log("remove token");
  localStorage.removeItem("clinicToken");

  try {
    console.log("logout success");
    window.location.href = "/DoctorLogin";
  } catch (error) {
    console.error("logout failed", error);
  }
}
