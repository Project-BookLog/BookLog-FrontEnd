export type ReaderType = "BEGINNER_READER" | "PROFESSIONAL_READER";
export type PreferredMood = "WARM" | "CALM" | "COOL" | "DREAMY" | "CHEERFUL" | "DARK";
export type SentenceBreath = "CONCISE" | "ELABORATE";
export type ExpressionTexture = "PLAIN" | "DELICATE";
export type ExpressionDirection = "DIRECT" | "METAPHORICAL";
export type ReadingMoment = "ROUTINE_TRANSITION" | "INTELLECTUAL_EXPLORATION" | "IMMERSIVE_FLOW" | "LINGERING_AFTERTASTE";

export interface RequestOnboardingAnswers {
    readerType?: ReaderType;
    preferredMood1?: PreferredMood;
    preferredMood2?: PreferredMood;
    sentenceBreath?: SentenceBreath;
    expressionTexture?: ExpressionTexture;
    expressionDirection?: ExpressionDirection;
    readingMoment?: ReadingMoment;
};

export interface ResponseOnboardingAnswers {
    readerType: ReaderType;
    preferredMood1: PreferredMood;
    preferredMood2: PreferredMood;
    sentenceBreath: SentenceBreath;
    expressionTexture: ExpressionTexture;
    expressionDirection: ExpressionDirection;
    readingMoment: ReadingMoment;
    updatedAt: Date | string | null;
    isCompleted: boolean;
    completedAt: Date | string | null;
}