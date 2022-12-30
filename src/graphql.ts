
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface TextQuestionInput {
    label: string;
    isRequired: boolean;
    order: number;
}

export interface MultiLineTextQuestionInput {
    label: string;
    isRequired: boolean;
    order: number;
}

export interface DateQuestionInput {
    label: string;
    isRequired: boolean;
    order: number;
}

export interface OneFromManyQuestionInput {
    label: string;
    options: string[];
    isRequired: boolean;
    order: number;
}

export interface SeveralFromManyQuestionInput {
    label: string;
    options: string[];
    isRequired: boolean;
    order: number;
}

export interface QuestionsInput {
    text: TextQuestionInput[];
    multiLineText: MultiLineTextQuestionInput[];
    date: DateQuestionInput[];
    oneFromMany: OneFromManyQuestionInput[];
    severalFromMany: SeveralFromManyQuestionInput[];
}

export interface AnswersInput {
    text: Nullable<string>[];
    multiLineText: Nullable<string>[];
    date: Nullable<string>[];
    oneFromMany: Nullable<string>[];
    severalFromMany: Nullable<string>[];
}

export interface CreateFormInput {
    name: string;
    desc: string;
    isPrivate: boolean;
    questions: QuestionsInput;
    invitedUsersToReply: string[];
}

export interface CreateFormReplyInput {
    formId: string;
    answers: AnswersInput;
}

export interface ChangeFormAcceptsRepliesStatus {
    to: boolean;
    formId: string;
}

export interface GetUserInput {
    username: string;
}

export interface InviteUsersToReplyFormInput {
    formId: string;
    userIds: string[];
}

export interface TextQuestion {
    _id: string;
    label: string;
    isRequired: boolean;
    order: number;
}

export interface DateQuestion {
    _id: string;
    label: string;
    isRequired: boolean;
    order: number;
}

export interface OneFromManyQuestion {
    _id: string;
    label: string;
    options: string[];
    isRequired: boolean;
    order: number;
}

export interface SeveralFromManyQuestion {
    _id: string;
    label: string;
    options: string[];
    isRequired: boolean;
    order: number;
}

export interface MultiLineTextQuestion {
    _id: string;
    label: string;
    options: string[];
    isRequired: boolean;
    order: number;
}

export interface Questions {
    text: TextQuestion[];
    multiLineText: MultiLineTextQuestion[];
    date: DateQuestion[];
    oneFromMany: OneFromManyQuestion[];
    severalFromMany: SeveralFromManyQuestion[];
}

export interface User {
    _id: string;
    username: string;
    githubId: string;
}

export interface Answers {
    text: Nullable<string>[];
    multiLineText: Nullable<string>[];
    date: Nullable<string>[];
    oneFromMany: Nullable<number>[];
    severalFromMany: Nullable<number>[];
}

export interface Form {
    _id: string;
    name: string;
    desc: string;
    questions: Questions;
    numReplies: number;
    acceptsReplies: boolean;
    invitedUsersToReply: User[];
    isAllowedToReply: boolean;
    repliers: User[];
}

export interface FormReply {
    _id: string;
    answers: Answers;
}

export interface InviteUserToReplyNotification {
    _id: string;
    type: string;
    formId: string;
    form: Form;
}

export interface IQuery {
    me(): User | Promise<User>;
    form(_id: string): Form | Promise<Form>;
    notifications(): NotificationUnion[] | Promise<NotificationUnion[]>;
    user(input: GetUserInput): User | Promise<User>;
}

export interface IMutation {
    createForm(input: CreateFormInput): Form | Promise<Form>;
    createFormReply(input: CreateFormReplyInput): FormReply | Promise<FormReply>;
    changeFormAcceptsRepliesStatus(input: ChangeFormAcceptsRepliesStatus): boolean | Promise<boolean>;
    inviteUsersToReplyForm(input: InviteUsersToReplyFormInput): boolean | Promise<boolean>;
}

export type NotificationUnion = InviteUserToReplyNotification;
type Nullable<T> = T | null;
