type Props = {
  profile: {
    education: string[];
    debut: string | null;
    birthDate: string | null;
    occupations: string[];
  };
};

function AuthorProfile({ profile }: Props) {
  return (
    <div className="px-6 my-8 space-y-10">
      <section>
        <p className="text-title-02 text-black mb-4">기본 정보</p>

        <div className="space-y-2 text-gray-700 text-body-03">
          <div className="flex">
            <span className="w-20">학력</span>
            <span>
              {profile.education?.length
                ? profile.education.join(", ")
                : "-"}
            </span>
          </div>

          <div className="flex">
            <span className="w-20">데뷔</span>
            <span>{profile.debut ?? "-"}</span>
          </div>

          <div className="flex">
            <span className="w-20">출생</span>
            <span>{profile.birthDate ?? "-"}</span>
          </div>

          <div className="flex">
            <span className="w-20">직업</span>
            <span>
              {profile.occupations?.length
                ? profile.occupations.join(", ")
                : "-"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthorProfile;
