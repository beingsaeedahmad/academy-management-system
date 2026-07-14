import { create } from "zustand";
import { Student } from "@/types";


interface AcademyStore {

  students: Student[];

  addStudent: (
    student: Omit<Student, "id" | "createdAt" | "updatedAt">
  ) => void;

  updateStudent: (
    id: string,
    data: Partial<Student>
  ) => void;

  deleteStudent: (
    id: string
  ) => void;

  getStudent: (
    id: string
  ) => Student | undefined;

}


export const useAcademyStore = create<AcademyStore>((set, get) => ({

  students: [],


  addStudent: (student) => {

    const newStudent: Student = {

      id: crypto.randomUUID(),

      ...student,

      createdAt: new Date(),

      updatedAt: new Date(),

    };


    set((state) => ({

      students: [
        ...state.students,
        newStudent
      ]

    }));

  },


  updateStudent: (id, data) => {

    set((state) => ({

      students: state.students.map((student) =>

        student.id === id

          ? {
              ...student,
              ...data,
              updatedAt: new Date()
            }

          : student

      )

    }));

  },


  deleteStudent: (id) => {

    set((state) => ({

      students: state.students.filter(

        (student) => student.id !== id

      )

    }));

  },


  getStudent: (id) => {

    return get().students.find(

      (student) => student.id === id

    );

  },


}));