import { authClient } from "@/lib/auth-client"

interface SignInArgs {
    email: string,
    password: string
}

interface SignUpArgs extends SignInArgs {
    name: string

}
export default function useAuth() {
    const signUpFunction = async (details: SignUpArgs) => {
        await authClient.signUp.email({
            email: details.email,
            password: details.password,
            name: details.name
        }, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            },
            onRequest: () => {
                console.log("request")
            }
        })
    }
    const signinFunction = async (details: SignInArgs) => {
        await authClient.signIn.email({
            email: details.email,
            password: details.password
        }, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            },
            onRequest: () => {
                console.log("request")
            }
        })
    }

    const signOutFunction = async () => await authClient.signOut(
        {}, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        },
        onRequest: () => {
            console.log("request")
        }
    }
    )
    const githubSigninFunction = async () => {
        await authClient.signIn.social({
            provider: "github"
        }, {
            onSuccess: (data) => {
                console.log(data)
            },
            onError: (error) => {
                console.log(error)
            },
            onRequest: () => {
                console.log("request")
            }
        })
    }

    return { signUpFunction, signinFunction, signOutFunction, githubSigninFunction }
}