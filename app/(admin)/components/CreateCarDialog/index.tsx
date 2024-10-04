"use client";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createCar } from "@/app/actions/car";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadButton } from "@/app/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  imageUrl: z.string().url({ message: "Please upload the image." }),
  price: z.number().min(1, { message: "Price must be greater than 0." }),
  rentalPrice: z
    .number()
    .min(1, { message: "Rental price must be greater than 0." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
  fuel: z.string().min(1, { message: "Fuel type is required." }),
  transmission: z
    .string()
    .min(1, { message: "Transmission type is required." }),
  brand: z.string().min(1, { message: "Brand is required." }),
  engine: z.number().min(0, { message: "Engine size is required." }),
  year: z.number().min(1900, { message: "Year must be valid." }),
  class: z.string().min(1, { message: "Class is required." }),
  available: z.boolean().default(true),
});

export function CreateCarDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      price: 0,
      rentalPrice: 0,
      description: "",
      fuel: "",
      transmission: "",
      brand: "",
      engine: 0,
      year: new Date().getFullYear(),
      class: "",
      available: true,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const car = await createCar({ data });
      toast.success(`Car "${car.name}" created successfully!`);
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Error creating car: " + error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary-300 hover:bg-primary-200">+ Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md h-96 overflow-auto">
          <DialogHeader>
            <DialogTitle>Create a new car</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {Object.keys(formSchema.shape).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem className="flex items-start flex-col ">
                      <FormLabel>
                        {field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                      </FormLabel>
                      <FormControl>
                        {["price", "rentalPrice", "engine", "year"].includes(
                          field.name
                        ) ? (
                          <Input
                            type="number"
                            placeholder={field.name}
                            value={
                              field.value === undefined || field.value === null
                                ? ""
                                : field.value.toString()
                            }
                            onChange={(e) => {
                              const parsedValue = parseFloat(e.target.value);
                              field.onChange(
                                !isNaN(parsedValue) ? parsedValue : 0
                              );
                            }}
                          />
                        ) : field.name === "available" ? (
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        ) : field.name === "imageUrl" ? (
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                              if (res && res.length > 0) {
                                const uploadedFileUrl = res[0].url;
                                field.onChange(uploadedFileUrl);
                                toast.success("Image uploaded successfully!");
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(`Upload error: ${error.message}`);
                            }}
                          />
                        ) : (
                          <Input
                            placeholder={field.name}
                            value={field.value?.toString() ?? ""}
                            onChange={field.onChange}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
