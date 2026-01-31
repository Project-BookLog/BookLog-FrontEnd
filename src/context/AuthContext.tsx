import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestLoginDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { usePostLogin } from "../hooks/mutations/usePostLogin";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestLoginDto) => Promise<void>;
    logout: () => Promise<void>;
    userId: number | undefined;
    nickname: string | undefined;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
    userId: undefined,
    nickname: undefined,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
    const {
        getItem: getUserIdFromStorage,
        setItem: setUserIdInStorage,
        removeItem: removeUserIdFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.userId);
    const {
        getItem: getNicknameFromStorage,
        setItem: setNicknameInStorage,
        removeItem: removeNicknameFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.nickname);
    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );
    const [refreshToken, setRefreshToken] = useState<string | null> (
        getRefreshTokenFromStorage(),
    );
    const [ userId, setUserId] = useState<number | undefined>(
        getUserIdFromStorage(),
    );
    const [ nickname, setNickname] = useState<string | undefined>(
        getNicknameFromStorage(),
    );

    const { mutateAsync: loginMutateAsync } = usePostLogin();

    const login = async (loginData: RequestLoginDto) => {
        try {
            const data = await loginMutateAsync(loginData);

            if (data) {
                const newAccessToken = data.data?.accessToken
                const newRefreshToken = data.data?.refreshToken;

                if (!newAccessToken || !newRefreshToken) {
                    throw new Error("토큰이 응답에 포함되지 않았습니다.");
                }

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                const myInfo = await getMyInfo();
                setUserId(myInfo?.userId);
                setUserIdInStorage(myInfo?.userId);
                setNickname(myInfo?.nickname);
                setNicknameInStorage(myInfo?.nickname);
            } 
        } catch (error) {
            console.error("로그인 오류", error);
            throw error;
        }
    };

    const logout = async() => {
        try {
            
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            removeUserIdFromStorage();
            removeNicknameFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            setUserId(undefined);
            setNickname(undefined);

        } catch (error) {
            console.log("로그아웃 오류", error);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, userId, nickname }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};