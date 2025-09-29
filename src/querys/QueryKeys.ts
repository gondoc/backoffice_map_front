export const QueryKeys = {

    // 지도 POI 리스트 조회
    MAP: {
        map: ["map"] as const,
        list: () => [...QueryKeys.MAP.map, "list"] as const,
        year: () => [...QueryKeys.MAP.map, "year"] as const,
        time: () => [...QueryKeys.MAP.map, "time"] as const,
        cate: () => [...QueryKeys.MAP.map, "cate"] as const,
        site: () => [...QueryKeys.MAP.map, "site"] as const,
        stat: () => [...QueryKeys.MAP.map, "stat"] as const,
    },

    member: {
        member: ["member"] as const,
        me: ["member", "me"] as const,
        idCheck: (id: string) => [...QueryKeys.member.member, "idCheck", id] as const,
        nickCheck: (nick: string | null) => [...QueryKeys.member.member, "nickCheck", nick] as const,
        email: {
            codeSend: (email: string) => [...QueryKeys.member.member, "email", email] as const,
        },
        nick: () => [...QueryKeys.member.member, "nick"] as const,
        logout: () => [...QueryKeys.member.member, "logout"] as const,
    }

}
