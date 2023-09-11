import { Prisma } from '@prisma/client';
import { PRODUCTS } from './query.type';

export const queryBuilder = (request: { type: number; from: any; to: any }) => {
  let match: any = {};
  switch (request.type) {
    case PRODUCTS.GET_PRODUCT_LIST: {
      const products: Prisma.productsFindManyArgs = {
        where: {
          createdDate: {
            gte: request.from,
            lte: request.to,
          },
        },
        select: {
          createdDate: true,
          id: true,
        },
      };
      match = { ...products };
      break;
    }

    default: {
      break;
    }
  }

  return match;
};

export const formatData = (data: any) => {
  const product = {
    title: data.title,
    body_html: data.body_html,
    vendor: data.vendor,
    product_type: data.product_type,
    handle: data.handle,
    tags: data.tags,
    variants: data.variants.map(
      ({
        id,
        created_at,
        updated_at,
        quantity_rule,
        title,
        image_id,
        ...variant
      }) => ({
        ...variant,
      }),
    ),
    options: data.options.map(({ name, position, value }) => ({
      name,
      position,
      value,
    })),

    images: data.images.map(({ position, alt, width, heigth, src }) => ({
      position,
      alt,
      width,
      heigth,
      src,
    })),
    image: {
      position: data.image.position,
      alt: data.image.alt,
      width: data.image.width,
      heigth: data.image.heigth,
      src: data.image.src,
    },
  };

  return { product };
};

export const getImageAndVariantIndex = (variantId: number, images) => {
  return images
    .map((image, index) => {
      if (image.variant_ids.includes(variantId)) {
        return index;
      }
    })
    .filter((item) => item !== undefined);
};
