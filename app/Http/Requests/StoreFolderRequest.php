<?php

namespace App\Http\Requests;

use App\Models\Folder;
use Illuminate\Foundation\Http\FormRequest;

class StoreFolderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    $exists = Folder::query()
                        ->where($attribute, $value)
                        ->where('box_id', $this->box_id)
                        ->where('parent_folder_id', $this->parent_folder_id)
                        ->exists();

                    if ($exists) {
                        $fail('This folder already exists in this location.');
                    }
                }
            ],
            'parent_folder_id' => ['nullable', 'exists:folders,id'],
            'box_id' => ['required', 'exists:boxes,id'],
        ];
    }
}

