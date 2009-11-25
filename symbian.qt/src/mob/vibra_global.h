#ifndef VIBRA_GLOBAL_H
#define VIBRA_GLOBAL_H

#include <QtCore/qglobal.h>

#if defined(XQVIBRA_LIBRARY)
#  define XQVIBRA_EXPORT Q_DECL_EXPORT
#else
#  if defined(XQVIBRA_NO_LIBRARY)
#    define XQVIBRA_EXPORT
#  else
#    define XQVIBRA_EXPORT Q_DECL_IMPORT
#  endif
#endif

#endif // VIBRA_GLOBAL_H
