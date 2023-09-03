"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRelationalFieldsMapper = exports.academicDepartmentRelationalFields = exports.academicDepartmentSearchableFields = exports.academicDepartmentFilterableFields = void 0;
exports.academicDepartmentFilterableFields = [
    'searchTerm',
    'id',
    'academicFacultyId'
];
exports.academicDepartmentSearchableFields = ['title'];
exports.academicDepartmentRelationalFields = ['academicFacultyId'];
exports.academicDepartmentRelationalFieldsMapper = {
    academicFacultyId: 'academicFaculty'
};
