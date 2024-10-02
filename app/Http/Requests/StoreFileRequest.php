<?php

namespace App\Http\Requests;

use App\Models\File;
use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
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
            'file' => [
                'required',
                'file',
                function ($attribute, $value, $fail) {
                    $fileName = $value->getClientOriginalName();

                    $exists = File::query()
                        ->where('name', $fileName)
                        ->where('box_id', $this->box_id)
                        ->where('parent_folder_id', $this->parent_folder_id)
                        ->exists();

                    if ($exists) {
                        $fail('This file already exists in this location.');
                    }
                },
            ],
            'box_id' => 'required|exists:boxes,id',
        ];
    }
}
